export type Options = { name: string };

export const utility = (options?: Options) => {
  console.log(`Utility name: ${options?.name ?? 'none :('}`);
  return options?.name;
};
