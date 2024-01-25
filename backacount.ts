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
    private balance: number;
    private pinCode: string;
    private result: any;
    database: Database;
    
    constructor(accountNumber: string, balance: number, pinCode: string) {
        this.database = new Database();
        this.result = this.database.executeSQL(`SELECT * FROM bank WHERE accountNumber = ${this.accountNumber}`)
    }
    
    public returnAccount = () => {
        console.log(this.result)
    }
    
}

const bankAccount = new BankAccount("d", 3, "d")
bankAccount.returnAccount