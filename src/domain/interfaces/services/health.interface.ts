export interface Health {
  getHealth: () => string;
}
export const Health = Symbol('Health');
