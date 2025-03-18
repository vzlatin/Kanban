import { useEffect } from "react";
import { useKanbanStore } from "../../state/stores/global/global.store";

const DataLoader = () => {
  useEffect(() => {
    const fetchEntities = useKanbanStore.getState().getEntityCollection;
    fetchEntities();
  }, []);

  return null;
};

export default DataLoader;
