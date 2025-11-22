import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Lock } from "lucide-react"
import { Link } from "react-router-dom"
import { useState , useEffect} from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import api from "@/services/api"


export default function RegisterPage(){
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [occupation, setOccupation] = useState("")
    const [typeOfJob, setTypeOfJob] = useState("")

    async function register(e: React.FormEvent) {
        e.preventDefault(); 

        try {
        const response = await api.post("/auth/register", {
            name,
            email,
            password,
            occupation,
            typeOfJob
        });

        console.log(response.data);
        alert("Usuário registrado com sucesso!");
        } catch (error: any) {
        console.error(error);
        alert("Erro ao registrar.");
        }
    }

    return (
        <div className="w-auto h-screen flex items-center justify-center">
            <div className="absolute top-1/2 transform -translate-y-[260px]">
            <div className="w-20 h-20 bg-linear-to-br from-violet-400 to-indigo-500  rounded-full shadow-lg flex items-center justify-center">
                <User className="text-white" size={36} />
            </div>
            </div>

            <Card className="w-[380px] rounded-2xl shadow-lg bg-white relative mt-16">
            <CardContent className="p-6">
                <form onSubmit={register}>
                    {/* Nome */}
                    <div className="mb-4">
                        <Label htmlFor="username" className="text-gray-600">Nome</Label>
                        <div className="flex items-center gap-2 mt-1 bg-gray-100 rounded-lg px-3">
                            <User className="text-gray-400" size={20} />
                            <Input
                            id="name"
                            type="text"
                            placeholder="Digite seu nome"
                            className="border-none bg-transparent focus-visible:ring-0"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Email */}
                    <div className="mb-4">
                        <Label htmlFor="username" className="text-gray-600">E-mail</Label>
                        <div className="flex items-center gap-2 mt-1 bg-gray-100 rounded-lg px-3">
                            <User className="text-gray-400" size={20} />
                            <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu e-mail"
                            className="border-none bg-transparent focus-visible:ring-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Senha */}
                    <div className="mb-4">
                        <Label htmlFor="password" className="text-gray-600">Senha</Label>
                        <div className="flex items-center gap-2 mt-1 bg-gray-100 rounded-lg px-3">
                            <Lock className="text-gray-400" size={20} />
                            <Input
                            id="password"
                            type="password"
                            placeholder="Digite sua senha"
                            className="border-none bg-transparent focus-visible:ring-0"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="occupation" className="text-gray-600">Profissão</Label>
                        <div className="flex items-center gap-2 mt-1 bg-gray-100 rounded-lg px-3">
                            <User className="text-gray-400" size={20} />
                            <Input
                            id="occupation"
                            type="text"
                            placeholder="Digite seu nome"
                            className="border-none bg-transparent focus-visible:ring-0"
                            value={occupation}
                            onChange={(e) => setOccupation(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <Label htmlFor="occutypeOfJob" className="text-gray-600">Tipo de ocupação</Label>
                        <div className="flex items-center gap-2 mt-1 bg-gray-100 rounded-lg px-3">
                            <Select onValueChange={(value) => setTypeOfJob(value)}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione" />
                                </SelectTrigger>

                                <SelectContent>
                                    <SelectItem value="clt">CLT</SelectItem>
                                    <SelectItem value="autonomo">Autônomo</SelectItem>
                                    <SelectItem value="servidor publico">Servidor Público</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-black text-md py-2 rounded-full ">
                        Cadastrar
                    </Button>
                </form>
            </CardContent>
            </Card>
        </div>
    )
}