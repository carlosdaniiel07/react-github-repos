const save = (key: string, content: any): void => {
  if (!content) {
    return;
  }

  localStorage.setItem(key, JSON.stringify(content));
};

const get = <T>(key: string): T | null => {
  const content = localStorage.getItem(key);

  if (!content) {
    return null;
  }

  return JSON.parse(content);
};

const remove = (key: string): void => {
  localStorage.removeItem(key);
};

const storage = {
  save,
  get,
  remove,
};

export default storage;
