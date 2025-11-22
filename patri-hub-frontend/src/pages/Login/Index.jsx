import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { User, Lock } from "lucide-react"
import { Link } from "react-router-dom"

export default function LoginPage() {
  return (
    <div className="w-auto h-screen flex items-center justify-center">
      
     
      <div className="absolute top-1/2 transform -translate-y-[260px]">
        <div className="w-20 h-20 bg-linear-to-br from-violet-400 to-indigo-500  rounded-full shadow-lg flex items-center justify-center">
          <User className="text-white" size={36} />
        </div>
      </div>

     
      <Card className="w-[380px] rounded-2xl shadow-lg bg-white relative mt-16">
        <CardContent className="p-6">

          {/* Username */}
          <div className="mb-4">
            <Label htmlFor="username" className="text-gray-600">E-mail</Label>
            <div className="flex items-center gap-2 mt-1 bg-gray-100 rounded-lg px-3">
              <User className="text-gray-400" size={20} />
              <Input
                id="email"
                type="email"
                placeholder="Digite seu e-mail"
                className="border-none bg-transparent focus-visible:ring-0"
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
              />
            </div>
          </div>

          
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <input type="checkbox" name="remember" id="remember" />
              <Label htmlFor="remember" className="text-gray-500">Lembrar-me</Label>
            </div>
          
          <Button className=" py-2 rounded-full text-gray-500" >
            <Link to="/register">Criar Conta</Link>
          </Button>
          </div>

         
          <Button className="w-full bg-red-500 hover:bg-red-600 text-black text-md py-2 rounded-full ">
            LOGIN
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
