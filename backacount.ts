import * as mariadb from 'mariadb';
import { Pool } from 'mariadb'
//import { BANKACCOUNT_TABLE } from './database/schema'

export class Database {
    // Properties
    private _pool: Pool
    // Constructor
    constructor() {
      this._pool = mariadb.createPool({
        database: process.env.DB_NAME || 'minitwitter',
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'minitwitter',
        password: process.env.DB_PASSWORD || 'supersecret123',
        connectionLimit: 5,
      })
      this.initializeDBSchema()
    }
    // Methods
    private initializeDBSchema = async () => {
      console.log('Initializing DB schema...')
      await this.executeSQL(`
      CREATE TABLE IF NOT EXISTS bank (
          id INT NOT NULL AUTO_INCREMENT,
          accountNumber VARCHAR(255) NOT NULL,
          balance INT NOT NULL,
          pinCode VARCHAR(255) NOT NULL,
          PRIMARY KEY (id)
      );
      `)
    }
  
    public executeSQL = async (query: string) => {
      try {
        const conn = await this._pool.getConnection()
        const res = await conn.query(query)
        conn.end()
        return res
      } catch (err) {
        console.log(err)
      }
    }
  }


  export class BankAccount {
    private accountNumber: string;
    private pinCode: string | undefined;
    private result: any;
    database: Database;
    
    constructor(accountNumber: string, pinCode: string) {
        this.accountNumber = accountNumber;  // Assign the value here
        this.database = new Database();
        this.fetchAccount();    
    }
    
    private async fetchAccount() { 
        this.result = await this.database.executeSQL(`SELECT * FROM bank WHERE accountNumber = '${this.accountNumber}'`);
        this.returnAccount();
    }


    public returnAccount = () => {
        console.log(this.result);
    }


    public async transaction = (amount: number) => {
        const conn: mariadb.PoolConnection;

        conn = await Pool.getConnection();

        await conn.beginTransaction();

        await conn.query('Update ')
    }


}

const bankAccount = new BankAccount("1A", "12345");
bankAccount.returnAccount();