export const loadNominees = () => {
    try {
      const serializedState = localStorage.getItem('MyNomineeList');
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return [];
    }
};

export const saveState = (nominees) => {
    try {
      const serializedState = JSON.stringify(nominees);
      localStorage.setItem('MyNomineeList', serializedState);
    } catch {
    }
  };