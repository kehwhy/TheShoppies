/**
 * Loads nominee list from local storage
 */
export const loadNominees = () => {
    try {
      const serializedState = localStorage.getItem('NomineeList');
      if (serializedState === null) {
        return [];
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return [];
    }
};

/**
 * Saves provided nominee list to local storage
 * @param {Object[]} nominees 
 */
export const saveNominees = (nominees) => {
    try {
      const serializedState = JSON.stringify(nominees);
      localStorage.setItem('NomineeList', serializedState);
    } catch {
    }
  };