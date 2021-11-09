//前缀生成器
const getPrefixClass = (name: string, client: string = '') => {
  return `cpv${client}_${name}`;
};

export { getPrefixClass };
