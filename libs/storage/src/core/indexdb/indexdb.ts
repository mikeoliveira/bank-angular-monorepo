export class indexDB {
  constructor() {
  }
  db: any;
  createDatabase() {
    console.log('createDatabase');

    let dbRequest  = indexedDB.open('indexDB', 4);
    dbRequest.onsuccess = (event:any) => {
      this.db = event.target.result;
      console.log('on  success');

      // this.getUsers().then((users) => {
      //   console.log(users)
      // });

    }
    dbRequest.onerror = (event:any) => {
      console.log('Error: ' + event.target.errorCode);
    }

    //Quando abrir o banco pela primeira vez ou a versão for maior que a existente
    dbRequest.onupgradeneeded = (event:any) => {
      this.db = event.target.result;
      if(!this.db.objectStoreNames.contains('users')){
        this.db.createObjectStore('users', { keyPath: 'id', autoIncrement: true });
      }
    }
  }

  async getUsers(id?: number) {
    const transaction = this.db.transaction(['users'],  "readonly");
    let userTable  = transaction.objectStore('users');
    if(!id){
      let request: any = await this.dbPromise(userTable.getAll());
      return request;
    }
    let request: any = await this.dbPromise(userTable.get(id));
    return request;
    console.log('getUser',request);
  }

  /**
   * Adds one or more users to the users object store.
   * @param value One or more user objects to add. Each user object must have a `name` property.
   * @returns A promise that resolves when all users have been successfully added.
   * Example this.addUsers([{name: 'Rochele'},{name: 'Cris'}]);
   */
  async addUsers(value:any) {
    const transaction = this.db.transaction(['users'],  "readwrite");
    // let transaction = event.target.transaction;
    let userTable  = transaction.objectStore('users');

    return Promise.all(value.map(
      (user:any, index: number) => {

        this.dbPromise(userTable.put(user))
      }
    )
    ).finally(() => {
      this.refreshData();
    })
    // let request = await this.dbPromise(userTable.put({name: 'Mike'}));
    // this.getUsers(request as number);
    // console.log(request);
  }

  //Encapsulamento do OnSuccess e OnError da request de adição ou alteração de usuario
  dbPromise(request: any) {
    return new Promise((resolve, reject) => {
      request.onsuccess = (event:any) => {
        resolve(event.target.result);
      }
      request.onerror = (event:any) => {
        reject(event.target.errorCode);
      }
    })

  }

  refreshData() {
    this.getUsers().then((users) => {
      console.log("Dados atualizados:", users);
      // Atualize a UI aqui com os dados mais recentes
      //updateUI(users); // Exemplo de função que atualizaria a UI
    }) // Pegando todos os dados
  }

}
