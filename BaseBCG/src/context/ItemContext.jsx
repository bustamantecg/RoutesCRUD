import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const ItemContext = createContext();
const API_URL = "https://67f5b3f6913986b16fa55762.mockapi.io/api/basebcg/v1/articulos";

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar todos los artículos
  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (error) {
      toast.error("Error al obtener los datos");
    } finally {
      setLoading(false);
    }
  };

  // Crear nuevo artículo
  const createItem = async (data) => {
    try {
      const res = await axios.post(API_URL, data);
      setItems([...items, res.data]);
      toast.success("Artículo creado");
    } catch (error) {
      toast.error("Error al crear");
    }
  };

  // Eliminar artículo
  const deleteItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setItems(items.filter((item) => item.id !== id));
      toast.success("Artículo eliminado");
    } catch (error) {
      toast.error("Error al eliminar");
    }
  };

  // Actualizar artículo
  const updateItem = async (id, data) => {
    try {
      const res = await axios.put(`${API_URL}/${id}`, data);
      setItems(items.map((item) => (item.id === id ? res.data : item)));
      toast.success("Artículo actualizado");
    } catch (error) {
      toast.error("Error al actualizar");
    }
  };

  // Obtener uno solo por ID
  const getItem = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (error) {
      toast.error("Error al obtener detalle");
    }
  };
  
  const getItemById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/${id}`);
      return res.data;
    } catch (err) {
      console.error("Error al obtener:", err);
      return null;
    }
  };
  
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <ItemContext.Provider value={{
      items,
      loading,
      createItem,
      deleteItem,
      updateItem,
      getItem,
      getItemById
    }}>
      {children}
    </ItemContext.Provider>
  );
};

export const useItems = () => useContext(ItemContext);
