import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trash } from "lucide-react";
import { Pencil } from "lucide-react";
import { useState, useEffect } from "react";
import api from "@/services/api";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

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


 export default function AssetsPage() {

    interface Asset {
        id: number
        name: string
        description: string
        value: any
        status: string

    }
    const [form, setForm] = useState({
      name: "",
      description: "",
      value: "",
      status: "",
    });
    const [assets, setAssets] = useState<Asset[]>([])

    const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [assetToDelete, setAssetToDelete] = useState<Asset | null>(null);

    async  function loadAssets(){
      const token = localStorage.getItem("token");
      
      try{
          const response = await api.get("/assets/getAll",{
          headers: {
            Authorization: `Bearer ${token}`,
        },
        }) 
      setAssets(response.data.data)
      }catch(error){
          console.log("erro", error)
      }
    }

    function removeToken(){
        localStorage.removeItem("token")
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
      setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function createAsset() {
      try {
        const token = localStorage.getItem("token");

        const response = await api.post("/assets/create", form,{
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        loadAssets();

        setForm({
          name: "",
          description: "",
          value: "",
          status: "",
        });

      } catch (err) {
        console.error(err);
      }
    }
    function openEditDialog(asset: Asset) {
      setEditingAsset(asset);
      setEditOpen(true);
    }

    async function handleUpdateAsset() {
      if (!editingAsset) return;

      try {
        const token = localStorage.getItem("token");

        await api.put(`/assets/update/${editingAsset.id}`, editingAsset, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Atualiza lista
        setAssets((old) =>
          old.map((a) => (a.id === editingAsset.id ? editingAsset : a))
        );

        setEditOpen(false);

      } catch (error) {
        console.error("Erro ao atualizar asset", error);
      }
    }
    function openDeleteDialog(asset: Asset) {
      setAssetToDelete(asset);
      setDeleteOpen(true);
    }

    async function handleDeleteAsset() {
      if (!assetToDelete) return;

      try {
        const token = localStorage.getItem("token");

        await api.delete(`/assets/delete/${assetToDelete.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        // Remover da lista
        setAssets(old => old.filter(a => a.id !== assetToDelete.id));

        setDeleteOpen(false);
        setAssetToDelete(null);
        
      } catch (error) {
        console.error("Erro ao excluir asset:", error);
      }
    }

    useEffect(()=>{loadAssets(); },[])
  return (
    <div className="p-8 w-full">
        <Dialog>
              <DialogTrigger asChild>
                <Button className="mb-4 text-black">Novo Patrimônio</Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Cadastrar Patrimônio</DialogTitle>
                  <DialogDescription>
                    Preencha os dados abaixo para criar um patrimônio.
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                  <div>
                    <Label>Nome</Label>
                    <Input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label>Descrição</Label>
                    <Input
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label>Valor</Label>
                    <Input
                      name="value"
                      value={form.value}
                      onChange={handleChange}
                    />
                  </div>

                  <div>
                    <Label>Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(value) => setForm({ ...form, status: value })}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecione o status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="A">Ativo</SelectItem>
                        <SelectItem value="I">Inativo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <Button onClick={createAsset} className="text-black">Salvar</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden ">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Nome</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Descrição</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Valor</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200" >
                {assets.map(asset => {
                        return (
                            
                            <tr className="hover:bg-gray-50 transition-colors" key={asset.id}>
                                <td className="px-6 py-4 text-sm font-medium text-gray-900">{asset.name}</td>
                                <td className="px-6 py-4 text-sm text-gray-600">{asset.description}</td>
                                <td className="px-6 py-4 text-sm text-gray-900 font-semibold">{asset.value}</td>
                                <td className="px-6 py-4 text-sm">
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                                        {asset.status === "A" ? "Ativo" : "Inativo"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-sm flex items-center pb-12">
                                    <a href="#">
                                        <Trash className="h-5 w-5 text-red-500 cursor-pointer mr-5 mt-5"   onClick={() => openDeleteDialog(asset)}/>
                                    </a>

                                    <a href="#">
                                        <Pencil className="h-5 w-5 text-blue-500 cursor-pointer mt-5" onClick={() => openEditDialog(asset)}  />
                                    </a>
                                </td>
                            </tr>
                            
                        )
                       
                    })}
                 </tbody>              
            </table>
            
          </div>
        </div>

        <Dialog open={editOpen} onOpenChange={setEditOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Editar Patrimônio</DialogTitle>
              <DialogDescription>
                Atualize as informações do patrimônio.
              </DialogDescription>
            </DialogHeader>

            {editingAsset && (
              <div className="grid gap-4 py-4">
                
                <div>
                  <Label>Nome</Label>
                  <Input 
                    value={editingAsset.name}
                    onChange={(e) => 
                      setEditingAsset({ ...editingAsset, name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Descrição</Label>
                  <Input 
                    value={editingAsset.description}
                    onChange={(e) =>
                      setEditingAsset({ ...editingAsset, description: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Valor</Label>
                  <Input 
                    value={editingAsset.value}
                    onChange={(e) =>
                      setEditingAsset({ ...editingAsset, value: e.target.value })
                    }
                  />
                </div>

                <div>
                  <Label>Status</Label>
                  <Select
                    value={editingAsset.status}
                    onValueChange={(value) =>
                      setEditingAsset({ ...editingAsset, status: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">Ativo</SelectItem>
                      <SelectItem value="I">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <DialogFooter>
              <Button onClick={handleUpdateAsset} className="text-black">
                Salvar Alterações
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        
        <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Excluir Patrimônio</DialogTitle>
              <DialogDescription>
                Tem certeza que deseja excluir <strong>{assetToDelete?.name}</strong>? 
                Essa ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter className="mt-4">
              <Button variant="outline" onClick={() => setDeleteOpen(false)}>
                Cancelar
              </Button>

              <Button variant="destructive" onClick={handleDeleteAsset} className="text-black">
                Excluir
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

      </div>
    
  );
  
}
