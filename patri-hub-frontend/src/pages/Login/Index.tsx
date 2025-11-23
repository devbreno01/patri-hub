import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { User, Lock, CheckCircle, AlertTriangle } from "lucide-react"
import { Link, Navigate } from "react-router-dom"
import { useState , useEffect} from "react"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"

export default function LoginPage() {
  const [email,setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [token, setToken] = useState("")
  const [error, setError] = useState(false);
  const navigate = useNavigate();

   // Efeito para limpar os alerts após 5 segundos
    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
              setError(false);
            }, 5000);

            // Cleanup function
            return () => clearTimeout(timer);
        }
    }, [error]);

  async function login(e: React.FormEvent){
    e.preventDefault(); 
    try{
      const response = await api.post("/auth/login",{
        email,
        password
      });

      console.log(response) 
      localStorage.setItem("token", response.data.token); 
      
      navigate("/")

    }catch(error:any){
      setError(true)
      console.error(error);
    }
    
  }
  
  return (
    <div className="w-auto h-screen flex items-center justify-center">
      
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md space-y-4">
                {error && (
                    <Alert variant="destructive" className="animate-in fade-in-0 slide-in-from-top-5 duration-300 flex flex-col items-center">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Erro ao tentar logar</AlertTitle>
                        <AlertDescription>
                            E-mail ou senha incorretos
                        </AlertDescription>
                    </Alert>
                )}
        </div>
     
      <div className="absolute top-1/2 transform -translate-y-[260px]">
        <div className="w-20 h-20 bg-linear-to-br from-violet-400 to-indigo-500  rounded-full shadow-lg flex items-center justify-center">
          <User className="text-white" size={36} />
        </div>
      </div>

     
      <Card className="w-[380px] rounded-2xl shadow-lg bg-white relative mt-16">
        <CardContent className="p-6">
        <form onSubmit={login}>
          
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
                required
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
                required
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

         
          <Button type="submit" className="w-full bg-red-500 hover:bg-red-600 text-black text-md py-2 rounded-full ">
            LOGIN
          </Button>
        </form>
        </CardContent>
      </Card>
    </div>
  )
}
