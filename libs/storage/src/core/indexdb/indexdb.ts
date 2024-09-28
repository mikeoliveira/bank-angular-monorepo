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

      this.addUser();
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

  async getUsers(id: number) {
    const transaction = this.db.transaction(['users'],  "readonly");
    let userTable  = transaction.objectStore('users');
    let request = await this.dbPromise(userTable.get(id));

    console.log('getUser',request);
  }

  async addUser() {
    const transaction = this.db.transaction(['users'],  "readwrite");
    // let transaction = event.target.transaction;
    let userTable  = transaction.objectStore('users');
    let request = await this.dbPromise(userTable.put({name: 'Mike'}));
    this.getUsers(request as number);
    console.log(request);

  }

  //Encapsulamento
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
}
