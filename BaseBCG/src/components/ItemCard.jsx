import { Link } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ItemCard = ({ item }) => {
  const { deleteItem } = useItems();

  const handleDelete = () => {
    MySwal.fire({
      title: "¿Eliminar artículo?",
      text: "Esta acción no se puede deshacer",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(item.id);
      }
    });
  };

  return (
    <div className="card bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a] w-96 shadow-md">
      <figure className="px-10 pt-10">
        <img
          src={item.imagen}
          alt={item.nombre}
          className="rounded-xl w-80 h-60 object-cover"
        />
      </figure>
      <div className="card-body text-white">
        <h2 className="card-title">{item.descripcion}</h2>
        <p>Color: {item.color}</p>
        <p>Precio: $ {item.precio}</p>
        <p>Disponible: {item.stock} unidades</p>
        <div className="card-actions mt-4 flex justify-between">
          <Link
            to={`/items/${item.id}`}
            className="btn btn-sm btn-outline btn-info"
          >
            Ver
          </Link>
          <Link
            to={`/items/${item.id}/edit`}
            className="btn btn-sm btn-outline btn-warning"
          >
            Editar
          </Link>
          <button
            onClick={handleDelete}
            className="btn btn-sm btn-outline btn-error"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
