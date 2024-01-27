---
title: TypeScript Types
draft: false
tags:
  - typescript
date: 2024-01-27
---
## Interfaces vs. Types

Not too much difference - types are not open, interfaces are.

### Interfaces

in `./employees.ts`
```ts
export interface Employee {
  id: string;
  name: string;
  salary: number;
}
```


```ts
import { Employee } from "./employees";

interface Employee2 extends Employee {
  department: string;
}

const bob:Employee2 = {
  id: '12',
  name: 'Bob',
  salary: 120_000,
  department: 'dev'
}
// In a single file:

interface Animal {
  name: string;
}

interface Animal {
  color: string;
}

// automatically intersected

const bailey: Animal = {
  name: 'Bailey',
  color: 'Cream'
}
```


## Tagged Union Types

> [!NOTE] Consider putting the `*x*Result` types in a `shared` module.




## Observables

> [!note] For any operation that could be asynchronous, proscribe observables




## Refactoring of Bank Account


```typescript
import { v4 } from 'uuid';

export class BankAccount {
  private _balance = 5000;
  private _transactions: Transaction[] = [];

  constructor(public name: NameInfo) {}
  get balance() {
    return this._balance;
  }


  getLastTransaction(): Readonly<Transaction> | undefined {
    return this._transactions[0];
  }

  deposit(amountOfTransaction: number): void {
    this.applyTransaction(
      this.calculateTransaction({ type: 'deposit', amountOfTransaction })
    );

  }

  withdraw(amountOfTransaction: number): void {
    this.applyTransaction(
      this.calculateTransaction({ type: 'withdrawal', amountOfTransaction })

    );
  }


  private calculateTransaction(tx: BankTransaction): Transaction {
    const balanceAfterTransaction = this.calculateTransactionImpact(tx);
    const response: Transaction = {
      ...tx,
      id: 'TX' + v4(),
      balanceBeforeTransaction: this._balance,
      balanceAfterTransaction,
      posted: new Date().toISOString(),
    };
    return response;
  }

  

  private applyTransaction(tx: Transaction) {
    this._balance = tx.balanceAfterTransaction;
    this._transactions = [tx, ...this._transactions];
  }

  
  private calculateTransactionImpact(tx: BankTransaction): number {
    switch (tx.type) {
      case 'deposit':
        return this._balance + tx.amountOfTransaction;
      case 'withdrawal':
        return this._balance - tx.amountOfTransaction;
    }
  }
}

  

interface NameInfo {
  first: string;
  last: string;
  mi?: string;
}

  

type BankTransaction = {
  type: 'deposit' | 'withdrawal';
  amountOfTransaction: number;
};

export type Transaction = BankTransaction & {
  id: string;
  balanceBeforeTransaction: number;
  balanceAfterTransaction: number;
  posted: string; // An ISO-8601 string of the date and time of the transaction
};
```