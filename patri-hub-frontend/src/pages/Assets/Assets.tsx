import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

 

export default function AssetsPage(){
    return (
       <div className="p-16 max-w-4xl flex flex-wrap justify-around ">
            <div className="border rounded">
                <Table>
                    <TableHeader>
                        <TableHead>Nome</TableHead>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Status</TableHead>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>teste</TableCell>
                            <TableCell>teste2</TableCell>
                            <TableCell>teste3</TableCell>
                            <TableCell>teste4</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
       </div>
    )
}