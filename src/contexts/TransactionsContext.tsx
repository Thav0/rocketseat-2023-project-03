import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: "income" | "outcome";
  category: string;
  price: number;
  createdAt: string;
}

// Quais informações iremos retornar deste contexto
interface TransationsContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

// Desta forma naõ precisamos passar os valores dentro do context
export const TransactionsContext = createContext({} as TransationsContextType);

interface TransactionsProviderProps {
  children: ReactNode;
}

export function TransactionsProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function fetchTransactions(query?: string) {
    const response = await api.get("transactions", {
      params: {
        q: query,
      },
    });

    setTransactions(response.data);
  }

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
