import { useState } from "react";
import { useItems } from "../context/ItemContext";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

export default function ItemCreate() {
  const { createItem } = useItems();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    descripcion: "",
    color: "",
    talles: "",
    imagen: "",
    precio: "",
    oferta: false,
    publicar: true,
    stock: "1",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.descripcion || !form.precio || !form.imagen) {
      toast.error("Campos obligatorios incompletos");
      return;
    }

    try {
      await createItem({
        ...form,
        precio: Number(form.precio),
        stock: Number(form.stock),
      });
      toast.success("Artículo creado exitosamente");
      navigate("/items");
    } catch (error) {
      MySwal.fire("Error", "No se pudo crear el artículo", "error");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 shadow-md rounded-xl bg-gradient-to-r from-[#0f172a] to-[#334155] text-white">
      <h2 className="text-2xl font-bold mb-4">Crear nuevo artículo</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="label">Descripción</label>
          <input type="text" name="descripcion" value={form.descripcion} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Color</label>
          <input type="text" name="color" value={form.color} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Talles (ej: S, M, L)</label>
          <input type="text" name="talles" value={form.talles} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">URL de imagen</label>
          <input type="text" name="imagen" value={form.imagen} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Precio</label>
          <input type="number" name="precio" value={form.precio} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div>
          <label className="label">Stock</label>
          <input type="number" name="stock" value={form.stock} onChange={handleChange} className="input input-bordered w-full" />
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="oferta" checked={form.oferta} onChange={handleChange} className="checkbox" />
          <label>En oferta</label>
        </div>

        <div className="flex items-center gap-2">
          <input type="checkbox" name="publicar" checked={form.publicar} onChange={handleChange} className="checkbox" />
          <label>Publicar en catálogo</label>
        </div>

        <div className="flex gap-4 mt-6">
          <button type="submit" className="btn btn-primary w-full">Guardar</button>

        </div>
      </form>
      <div className="mt-4">
        <Link to="/items" className="btn btn-outline w-full">Cancelar</Link>
      </div>
    </div>
  );
}
