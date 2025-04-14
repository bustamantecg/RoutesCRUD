import { Link } from "react-router-dom";
import { useItems } from "../context/ItemContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const ItemCard = ({ item }) => {
  const { deleteItem } = useItems();

  const handleDelete = () => {
    MySwal.fire({
      title: '¿Eliminar artículo?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteItem(item.id);
      }
    });
  };

  return (
    <>

      <div className="card bg-base-100 w-96 shadow-sm">
        <figure className="px-10 pt-10">
          <img
            src={item.imagen} alt={item.nombre} className="rounded-xl" />
        </figure>
        <div className="card-body">
          <h2 className="card-title items-center">{item.descripcion}</h2>
          <p>Color: {item.color}</p>
          <p>Precio: {item.precio}</p>
          <div className="card-actions">
          <div className="flex justify-between mt-4">
            <Link to={`/items/${item.id}`} className="btn btn-sm btn-outline btn-info px-2">Ver</Link>
            <Link to={`/items/${item.id}/edit`} className="btn btn-sm btn-outline btn-warning">Editar</Link>
            <button onClick={handleDelete} className="btn btn-sm btn-outline btn-error">Eliminar</button>
            
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ItemCard;
