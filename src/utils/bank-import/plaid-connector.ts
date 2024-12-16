import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import { BankStatement, BankTransaction } from '../../types/documents';

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

export const importBankStatements = async (
  accessToken: string,
  startDate: string,
  endDate: string
): Promise<BankStatement[]> => {
  try {
    const response = await plaidClient.transactionsGet({
      access_token: accessToken,
      start_date: startDate,
      end_date: endDate,
    });

    const transactions = response.data.transactions;
    const accounts = response.data.accounts;

    return accounts.map(account => {
      const accountTransactions = transactions.filter(t => t.account_id === account.account_id);
      
      return {
        bankName: account.name,
        accountNumber: account.mask,
        statementPeriod: {
          start: new Date(startDate),
          end: new Date(endDate),
        },
        transactions: accountTransactions.map(t => ({
          date: new Date(t.date),
          description: t.name,
          amount: t.amount,
          type: t.amount < 0 ? 'debit' : 'credit',
          category: t.category?.[0],
        })),
        balances: {
          beginning: account.balances.current - sumTransactions(accountTransactions),
          ending: account.balances.current,
        },
      };
    });
  } catch (error) {
    console.error('Error importing bank statements:', error);
    throw new Error('Failed to import bank statements');
  }
};

const sumTransactions = (transactions: any[]): number => {
  return transactions.reduce((sum, t) => sum + t.amount, 0);
};