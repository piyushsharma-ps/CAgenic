import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { Transaction, AttentionItem, ActivityItem } from '../types';
import {
  TRANSACTIONS,
  INITIAL_ATTENTION_ITEMS,
  INITIAL_ACTIVITIES,
} from '../data/mockData';

export function subscribeTransactions(
  userId: string,
  onData: (items: Transaction[]) => void
) {
  const collPath = `users/${userId}/transactions`;
  const collRef = collection(db, 'users', userId, 'transactions');

  return onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        // Seed initial transactions into Google Firestore
        try {
          for (const tx of TRANSACTIONS) {
            await setDoc(doc(db, 'users', userId, 'transactions', tx.id), {
              ...tx,
              ownerId: userId,
            });
          }
          onData(TRANSACTIONS);
        } catch (err) {
          console.warn('Initial seeding transactions failed:', err);
          onData(TRANSACTIONS);
        }
      } else {
        const list: Transaction[] = snapshot.docs.map((d) => d.data() as Transaction);
        // Sort descending by date or id
        list.sort((a, b) => (b.id > a.id ? 1 : -1));
        onData(list);
      }
    },
    (error) => {
      console.warn('Firestore transactions error, falling back to local data:', error);
      onData(TRANSACTIONS);
      handleFirestoreError(error, OperationType.LIST, collPath, false);
    }
  );
}

export function subscribeAttentionItems(
  userId: string,
  onData: (items: AttentionItem[]) => void
) {
  const collPath = `users/${userId}/attention_items`;
  const collRef = collection(db, 'users', userId, 'attention_items');

  return onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          for (const item of INITIAL_ATTENTION_ITEMS) {
            await setDoc(doc(db, 'users', userId, 'attention_items', item.id), {
              ...item,
              ownerId: userId,
            });
          }
          onData(INITIAL_ATTENTION_ITEMS);
        } catch (err) {
          console.warn('Initial seeding attention items failed:', err);
          onData(INITIAL_ATTENTION_ITEMS);
        }
      } else {
        const list: AttentionItem[] = snapshot.docs.map((d) => d.data() as AttentionItem);
        onData(list);
      }
    },
    (error) => {
      console.warn('Firestore attention items error:', error);
      onData(INITIAL_ATTENTION_ITEMS);
      handleFirestoreError(error, OperationType.LIST, collPath, false);
    }
  );
}

export function subscribeActivities(
  userId: string,
  onData: (items: ActivityItem[]) => void
) {
  const collPath = `users/${userId}/activities`;
  const collRef = collection(db, 'users', userId, 'activities');

  return onSnapshot(
    collRef,
    async (snapshot) => {
      if (snapshot.empty) {
        try {
          for (const act of INITIAL_ACTIVITIES) {
            await setDoc(doc(db, 'users', userId, 'activities', act.id), {
              ...act,
              ownerId: userId,
            });
          }
          onData(INITIAL_ACTIVITIES);
        } catch (err) {
          console.warn('Initial seeding activities failed:', err);
          onData(INITIAL_ACTIVITIES);
        }
      } else {
        const list: ActivityItem[] = snapshot.docs.map((d) => d.data() as ActivityItem);
        onData(list);
      }
    },
    (error) => {
      console.warn('Firestore activities error:', error);
      onData(INITIAL_ACTIVITIES);
      handleFirestoreError(error, OperationType.LIST, collPath, false);
    }
  );
}

export async function addFirestoreTransaction(userId: string, tx: Transaction) {
  const path = `users/${userId}/transactions/${tx.id}`;
  try {
    await setDoc(doc(db, 'users', userId, 'transactions', tx.id), {
      ...tx,
      ownerId: userId,
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}

export async function updateFirestoreTransaction(
  userId: string,
  txId: string,
  updates: Partial<Transaction>
) {
  const path = `users/${userId}/transactions/${txId}`;
  try {
    await updateDoc(doc(db, 'users', userId, 'transactions', txId), updates);
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, path);
  }
}

export async function deleteFirestoreAttentionItem(userId: string, itemId: string) {
  const path = `users/${userId}/attention_items/${itemId}`;
  try {
    await deleteDoc(doc(db, 'users', userId, 'attention_items', itemId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

export async function addFirestoreActivity(userId: string, act: ActivityItem) {
  const path = `users/${userId}/activities/${act.id}`;
  try {
    await setDoc(doc(db, 'users', userId, 'activities', act.id), {
      ...act,
      ownerId: userId,
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path);
  }
}
