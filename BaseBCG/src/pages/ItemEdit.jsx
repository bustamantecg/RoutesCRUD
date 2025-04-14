import { useEffect, useState } from "react";
import { useParams, useNavigate , Link} from "react-router-dom";
import { useItems } from "../context/ItemContext";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ItemEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getItemById, updateItem } = useItems();

  const [formData, setFormData] = useState({
    descripcion: "",
    color: "",
    talles: "",
    imagen: "",
    precio: "",
    stock: "",
    oferta: false,
    publicar: false,
  });

  useEffect(() => {
    const fetchItem = async () => {
      const item = await getItemById(id);
      if (item) {
        setFormData({
          descripcion: item.descripcion || "",
          color: item.color || "",
          talles: item.talles || "",
          imagen: item.imagen || "",
          precio: item.precio || "",
          stock: item.stock || "",
          oferta: item.oferta || false,
          publicar: item.publicar || false,
        });
      } else {
        toast.error("Artículo no encontrado");
        navigate("/items");
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.descripcion || !formData.talles || !formData.precio || !formData.imagen) {
      toast.warning("Por favor complete los campos obligatorios");
      return;
    }
    if (parseFloat(formData.precio) <= 0) {
      toast.warning("El precio debe ser mayor a cero");
      return;
    }

    if (parseInt(formData.stock) < 0) {
      toast.warning("El stock no puede ser negativo");
      return;
    }

    const tallesLimpios = formData.talles
      .split(",")
      .map(t => t.trim())
      .join(",");

    setFormData(prev => ({ ...prev, talles: tallesLimpios }));

    const tallesValidos = /^[A-Z]+(,[A-Z]+)*$/;
    if (!tallesValidos.test(tallesLimpios)) {
      toast.warning("Los talles deben ser letras mayúsculas separadas por coma (ej: S,M,L)");
      return;
    }
    // Validar imagen
    const imagenValida = /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/i.test(formData.imagen);
    if (!imagenValida) {
      toast.warning("Ingrese una URL de imagen válida (jpg, jpeg, png, webp)");
      return;
    }
    const confirmed = await MySwal.fire({
      title: "¿Confirmar cambios?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, guardar",
    });

    if (confirmed.isConfirmed) {
      try {
        const actualizado = await updateItem(id, formData);
        toast.success("Artículo actualizado correctamente");
        navigate("/items");
      } catch (error) {
        console.error("Error al actualizar el artículo:", error);
        toast.error("Error al actualizar el artículo");
      }
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Editar Artículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Nombre del artículo</label>
          <input type="text" name="descripcion" value={formData.descripcion} onChange={handleChange} className="input input-bordered w-full" />
        </div>
        <div>
          <label className="label">Color</label>
          <input type="text" name="color" value={formData.color} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Talles (mayúsculas, separados por coma)</label>
          <input type="text" name="talles" value={formData.talles} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">URL de la imagen (jpg | jpeg | png | webp)</label>
          <input type="text" name="imagen" value={formData.imagen} onChange={handleChange} className="input input-bordered w-full" />
          {formData.imagen && (
            <div className="mt-4">
              <label className="label">Vista previa:</label>
              <img
                src={formData.imagen}
                alt="Vista previa"
                className="max-h-40 rounded border"
                onError={(e) => e.target.style.display = "none"}
              />
            </div>
          )}
        </div>

        <div>
          <label className="label">Precio</label>
          <input type="number" name="precio" value={formData.precio} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Stock</label>
          <input type="number" name="stock" value={formData.stock} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="oferta" checked={formData.oferta} onChange={handleChange} className="checkbox" />
          <label>Está en oferta</label>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="publicar" checked={formData.publicar} onChange={handleChange} className="checkbox" />
          <label>Publicar artículo</label>
        </div>

        <button type="submit" className="btn btn-primary w-full">Guardar Cambios</button>
      </form>
              <Link to="/items" className="btn btn-outline btn-secondary">
                Volver
              </Link>
    </div>
  );
}
