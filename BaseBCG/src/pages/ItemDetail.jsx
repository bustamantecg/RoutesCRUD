import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { motion } from "framer-motion";

const MySwal = withReactContent(Swal);

const ItemDetail = () => {
  const { id } = useParams();
  const { getItem, deleteItem } = useItems();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const data = await getItem(id);
        setItem(data);
      } catch (error) {
        toast.error("Error al cargar el artículo");
      }
    };
    fetchItem();
  }, [id, getItem]);

  const handleDelete = () => {
    MySwal.fire({
      title: "¿Eliminar artículo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteItem(id);
          toast.success("Artículo eliminado");
          navigate("/items");
        } catch {
          toast.error("Error al eliminar");
        }
      }
    });
  };

  if (!item)
    return <p className="text-center mt-10 text-lg text-gray-600">Cargando artículo...</p>;

  return (
<motion.div
  className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg"
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
>
  <h2 className="text-2xl font-semibold text-gray-700 mb-2 border-b pb-2">
    Detalles del artículo
  </h2>

  <h1 className="text-3xl font-bold text-center text-blue-900 mb-6">
    {item.descripcion}
  </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src={item.imagen}
            alt={item.nombre}
            className="w-full aspect-[4/3] object-cover rounded-lg border border-primary shadow"
          />
        </div>

        <div className="flex-1 space-y-2 text-gray-800 text-base">
          <p><strong>Color:</strong> {item.color}</p>
          <p><strong>Talles:</strong> {item.talles}</p>
          <p><strong>Precio:</strong> ${item.precio}</p>
          <p><strong>Oferta:</strong> {item.oferta ? "Sí" : "No"}</p>
          <p><strong>Publicar:</strong> {item.publicar ? "Sí" : "No"}</p>
          <p><strong>Stock:</strong> {item.stock}</p>
          <p><strong>Creado el:</strong> {new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-end">
        <Link to={`/items/${id}/edit`} className="btn btn-outline btn-primary">
          Editar
        </Link>
        <button onClick={handleDelete} className="btn btn-outline btn-error">
          Eliminar
        </button>
        <Link to="/items" className="btn btn-outline btn-secondary">
          Volver
        </Link>
      </div>
    </motion.div>
  );
};

export default ItemDetail;
