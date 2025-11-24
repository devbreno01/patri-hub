import { useEffect, useState } from "react";
import { Trash } from "lucide-react";
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
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import api from "@/services/api";

export default function AssetsHeirsPage() {

  interface Asset { id: number; name: string; }
  interface Heir { id: number; name: string; }
  interface Association {
    asset_id: number;
    asset_name: string;
    heir_id: number;
    heir_name: string;
  }

  const [heirs, setHeirs] = useState<any[]>([]);
  const [assets, setAssets] = useState<any[]>([]);

  const [associations, setAssociations] = useState<Association[]>([]);

  const [selectedAsset, setSelectedAsset] = useState<string>("");
  const [selectedHeir, setSelectedHeir] = useState<string>("");

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [toDelete, setToDelete] = useState<Association | null>(null);
  const token = localStorage.getItem("token");

  // Carregar todos os assets e heirs
  async function loadInitialData() {
    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      console.error("Token não encontrado");
      return;
    }

    try {
      const responseAssets = await api.get("/assets/getAll", {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setAssets(responseAssets.data?.data ?? []);

      const responseHeirs = await api.get("/heirs", {
        headers: { Authorization: `Bearer ${currentToken}` }
      });
      setHeirs(responseHeirs.data ?? []);
    } catch (error) {
      console.error("Erro ao carregar dados iniciais:", error);
    }
  }

  async function loadHeirsByAsset(assetId: string) {
    if (!assetId) {
      setAssociations([]);
      return;
    }

    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      console.error("Token não encontrado");
      setAssociations([]);
      return;
    }

    try {
        const response = await api.get(`/assets/${assetId}/heirs`, {
        headers: { Authorization: `Bearer ${currentToken}` }
        });

        const data = response.data;

        // segurança total - verificar diferentes formatos de resposta
        let heirsList: any[] = [];
        if (Array.isArray(data)) {
          heirsList = data;
        } else if (data?.data && Array.isArray(data.data)) {
          heirsList = data.data;
        } else if (data?.heirs && Array.isArray(data.heirs)) {
          heirsList = data.heirs;
        }

        // Encontrar o patrimônio selecionado para obter o nome
        // Usar o estado atual de assets
        const selectedAssetObj = assets.find(a => String(a.id) === assetId);
        const assetName = selectedAssetObj?.name || "";

        // Transformar os dados no formato esperado pelo estado associations
        const formattedAssociations: Association[] = heirsList.map((heir: any) => ({
          asset_id: Number(assetId),
          asset_name: assetName,
          heir_id: heir.id || heir.heir_id || heir.heirId,
          heir_name: heir.name || heir.heir_name || heir.heirName || ""
        }));

        setAssociations(formattedAssociations);
    } catch (error) {
        console.error("Erro ao carregar herdeiros:", error);
        setAssociations([]);
    }
    }


  // Criar associação
  async function handleAssociate() {
    if (!selectedAsset || !selectedHeir) {
      alert("Selecione um patrimônio e um herdeiro");
      return;
    }

    const currentToken = localStorage.getItem("token");
    if (!currentToken) {
      alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
      return;
    }

    try {
      await api.post(`/assets/${selectedAsset}/heirs/${selectedHeir}`, {}, {
        headers: { Authorization: `Bearer ${currentToken}` }
      });

      // Resetar o herdeiro selecionado
      setSelectedHeir("");
      
      // Recarregar as associações
      await loadHeirsByAsset(selectedAsset);
      
      alert("Associação criada com sucesso!");
    } catch (error: any) {
      console.error("Erro ao associar:", error);
      if (error.response?.status === 403 || error.response?.status === 401) {
        alert("Erro de autenticação. Verifique se você tem permissão ou se seu token está válido.");
      } else {
        alert("Erro ao criar associação");
      }
    }
  }

  // Deletar associação
  async function handleDeleteAssociation() {
    if (!toDelete) return;

    // Obter o token novamente para garantir que está atualizado
    const currentToken = localStorage.getItem("token");
    
    if (!currentToken) {
      alert("Token de autenticação não encontrado. Por favor, faça login novamente.");
      return;
    }

    try {
      console.log("Tentando deletar associação:", toDelete);
      console.log("URL:", `/assets/${toDelete.asset_id}/heirs/${toDelete.heir_id}`);
      console.log("Token:", currentToken ? "Presente" : "Ausente");
      
      const response = await api.delete(`/assets/${toDelete.asset_id}/heirs/${toDelete.heir_id}`, {
        headers: { 
          Authorization: `Bearer ${currentToken}`
        }
      });
      
      console.log("Resposta da API:", response);

      // Recarregar as associações após deletar
      await loadHeirsByAsset(String(toDelete.asset_id));

      setDeleteDialogOpen(false);
      setToDelete(null);
      alert("Associação removida com sucesso!");
    } catch (error: any) {
      console.error("Erro ao deletar:", error);
      console.error("Status:", error.response?.status);
      console.error("Detalhes do erro:", error.response?.data || error.message);
      
      if (error.response?.status === 403) {
        alert("Acesso negado. Verifique se você tem permissão para remover esta associação ou se seu token de autenticação está válido.");
      } else if (error.response?.status === 401) {
        alert("Sessão expirada. Por favor, faça login novamente.");
      } else {
        const errorMessage = error.response?.data?.message || error.message || "Erro desconhecido";
        alert(`Erro ao remover associação: ${errorMessage}`);
      }
    }
  }

  useEffect(() => { loadInitialData(); }, []);

  return (
    <div className="p-8 w-full max-w-7xl mx-auto">
      <h3 className="pb-4">Associção de Herdeiros a Patrimônios</h3>
      {/* SELECTS */}
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        
        {/* Select de Patrimônio */}
        <div className="flex-1">
          <Select
            value={selectedAsset}
            onValueChange={async (value) => {
              setSelectedAsset(value);
              setSelectedHeir(""); // Resetar herdeiro também
              // Aguardar um pouco para garantir que assets estejam carregados
              await loadHeirsByAsset(value);
            }}
          >
            <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 hover:border-gray-300 focus:border-purple-500 transition-colors shadow-sm">
              <SelectValue placeholder="Escolha um patrimônio" />
            </SelectTrigger>
            <SelectContent>
              {assets.map(a => (
                <SelectItem key={a.id} value={String(a.id)}>
                  {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Select de Herdeiro */}
        <div className="flex-1">
          <Select
            value={selectedHeir}
            onValueChange={(value) => setSelectedHeir(value)}
          >
            <SelectTrigger className="w-full h-12 text-base border-2 border-gray-200 hover:border-gray-300 focus:border-purple-500 transition-colors shadow-sm">
              <SelectValue placeholder="Escolha um herdeiro" />
            </SelectTrigger>
            <SelectContent>
              {heirs.map(h => (
                <SelectItem key={h.id} value={String(h.id)}>
                  {h.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Botão de associação */}
      <div className="flex justify-center mb-8">
        <Button 
          onClick={handleAssociate} 
          className="px-8 py-6 text-base font-semibold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={!selectedAsset || !selectedHeir}
        >
          Associar Herdeiro ao Patrimônio
        </Button>
      </div>

      {/* Tabela */}
      {selectedAsset && (
        <div className="rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-gray-50 to-gray-100 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100">
                <TableHead className="font-bold text-gray-700 py-4">Patrimônio</TableHead>
                <TableHead className="font-bold text-gray-700 py-4">Herdeiro</TableHead>
                <TableHead className="font-bold text-gray-700 py-4 text-center">Ações</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {associations.length > 0 ? (
                associations.map((item, index) => (
                  <TableRow 
                    key={`${item.asset_id}-${item.heir_id}-${index}`}
                    className="hover:bg-gray-50 transition-colors border-b border-gray-100"
                  >
                    <TableCell className="font-semibold text-gray-800 py-4">{item.asset_name}</TableCell>
                    <TableCell className="text-gray-700 py-4">{item.heir_name}</TableCell>
                    <TableCell className="py-4">
                      <div className="flex justify-center">
                        <Trash
                          className="w-5 h-5 text-red-500 cursor-pointer hover:text-red-700 transition-colors hover:scale-110"
                          onClick={() => {
                            setToDelete(item);
                            setDeleteDialogOpen(true);
                          }}
                        />
                      </div>
                    </TableCell>
                  </TableRow>   
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={3} className="text-center py-12 text-gray-500 text-lg">
                    {selectedAsset ? "Nenhuma associação encontrada para este patrimônio." : "Selecione um patrimônio para ver as associações."}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Dialog de exclusão */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="rounded-xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-800">Remover Associação</DialogTitle>
            <DialogDescription className="text-gray-600 mt-2">
              Tem certeza que deseja remover a associação entre
              <strong className="text-gray-800"> {toDelete?.heir_name} </strong>
              e
              <strong className="text-gray-800"> {toDelete?.asset_name}</strong>?
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="gap-3 mt-6">
            <Button 
              variant="outline" 
              onClick={() => setDeleteDialogOpen(false)}
              className="px-6 py-2 border-gray-300 hover:bg-gray-50"
            >
              Cancelar
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAssociation}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-black"
            >
              Remover
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}