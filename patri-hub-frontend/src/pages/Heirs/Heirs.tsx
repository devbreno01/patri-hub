import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash, Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/services/api";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function HeirsPage() {

  interface Heir {
    id: number;
    name: string;
    phoneNumber: string;
    relation : string;
  }

  // Estados
  const [heirs, setHeirs] = useState<Heir[]>([]);
  const [form, setForm] = useState({
    name: "",
    phoneNumber: "",
    relation: "",
  });

  const [editingHeir, setEditingHeir] = useState<Heir | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [heirToDelete, setHeirToDelete] = useState<Heir | null>(null);

  
  async function loadHeirs() {
    const token = localStorage.getItem("token");

    try {
      const response = await api.get("/heirs", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHeirs(response.data);
    } catch (error) {
      console.error("Erro ao carregar herdeiros", error);
    }
  }

  // Atualizar formulário
  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  //Criar herdeiro
  async function createHeir() {
    const token = localStorage.getItem("token");

    try {
      await api.post("/heirs", form, {
        headers: { Authorization: `Bearer ${token}` },
      });

      loadHeirs();

      setForm({
        name: "",
        phoneNumber: "",
        relation: "",
      });
    } catch (err) {
      console.error("Erro ao criar herdeiro", err);
    }
  }


  function openEditDialog(heir: Heir) {
    setEditingHeir(heir);
    setEditOpen(true);
  }


  async function handleUpdateHeir() {
    if (!editingHeir) return;
    const token = localStorage.getItem("token");

    try {
      await api.put(`/heirs/${editingHeir.id}`, editingHeir, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHeirs((old) =>
        old.map((h) => (h.id === editingHeir.id ? editingHeir : h))
      );

      setEditOpen(false);
    } catch (error) {
      console.error("Erro ao atualizar herdeiro", error);
    }
  }


  function openDeleteDialog(heir: Heir) {
    setHeirToDelete(heir);
    setDeleteOpen(true);
  }

  
  async function handleDeleteHeir() {
    if (!heirToDelete) return;
    const token = localStorage.getItem("token");

    try {
      await api.delete(`/heirs/${heirToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setHeirs((old) => old.filter((h) => h.id !== heirToDelete.id));

      setDeleteOpen(false);
      setHeirToDelete(null);
    } catch (error) {
      console.error("Erro ao excluir herdeiro", error);
    }
  }

  useEffect(() => {
    loadHeirs();
  }, []);

  return (
    <div className="p-8 w-full">

      {/* -------------------- Dialog Create -------------------- */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mb-4 text-black">Novo Herdeiro</Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cadastrar Herdeiro</DialogTitle>
            <DialogDescription>
              Preencha os dados para cadastrar um novo herdeiro.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div>
              <Label>Nome</Label>
              <Input name="name" value={form.name} onChange={handleChange} />
            </div>

            <div>
              <Label>Numero de Telefone</Label>
              <Input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} />
            </div>

            <div>
              <Label>Grau de parentesco</Label>
              <Input name="relation" value={form.relation} onChange={handleChange} />
            </div>
          </div>

          <DialogFooter>
            <Button onClick={createHeir} className="text-black">Salvar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------------------- Table -------------------- */}
      <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden ">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Nome</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Telefone</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Grau de Parentesco</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700">Ações</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {heirs.map((heir) => (
                <tr key={heir.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium">{heir.name}</td>
                  <td className="px-6 py-4 text-sm">{heir.phoneNumber}</td>
                  <td className="px-6 py-4 text-sm">{heir.relation}</td>

                  <td className="px-6 py-4 text-sm flex items-center pb-12">
                    <Trash
                      className="h-5 w-5 text-red-500 cursor-pointer mr-5 mt-5"
                      onClick={() => openDeleteDialog(heir)}
                    />
                    <Pencil
                      className="h-5 w-5 text-blue-500 cursor-pointer mt-5"
                      onClick={() => openEditDialog(heir)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* -------------------- Dialog Edit -------------------- */}
      <Dialog open={editOpen} onOpenChange={setEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Herdeiro</DialogTitle>
            <DialogDescription>Atualize os dados do herdeiro.</DialogDescription>
          </DialogHeader>

          {editingHeir && (
            <div className="space-y-4 mt-4">

              <div>
                <Label>Nome</Label>
                <Input
                  value={editingHeir.name}
                  onChange={(e) =>
                    setEditingHeir({ ...editingHeir, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Número de Telefone</Label>
                <Input
                  value={editingHeir.phoneNumber}
                  onChange={(e) =>
                    setEditingHeir({ ...editingHeir, phoneNumber: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Grau de parentesco</Label>
                <Input
                  value={editingHeir.relation}
                  onChange={(e) =>
                    setEditingHeir({
                      ...editingHeir,
                      relation: String(e.target.value),
                    })
                  }
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={handleUpdateHeir} className="text-black">
              Salvar alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* -------------------- Dialog Delete -------------------- */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Excluir Herdeiro</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir{" "}
              <strong>{heirToDelete?.name}</strong>? Essa ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteOpen(false)}>
              Cancelar
            </Button>

            <Button variant="destructive" onClick={handleDeleteHeir} className="text-black">
              Excluir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  );
}
