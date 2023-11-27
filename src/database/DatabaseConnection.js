import * as SQLite from 'expo-sqlite';

export const DatabaseConnection = {
    getConnetction: () => SQLite.openDatabase("database.db")

};