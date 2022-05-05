import 'egg';

declare module 'egg' {
  interface mysql {
    query(sql: string, values:? Any[]): Promise<Any>;
  };

  interface Application {
    mysql: mysql;
  };
}