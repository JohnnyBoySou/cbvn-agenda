'use client';
import { useEffect, useState } from "react";
import { BookingList } from "@/components/booking-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import {  getUser } from "@/hooks/user";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { AlignJustify, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { deleteToken } from "@/hooks/token";
import Profile from "./dashboard/profile/page";

export default function Home() {
  const [user, setuser] = useState({ isAdmin: false, name: '', email: '' });
  useEffect(() => {
    const verify = async () => {
      const res: any = await getUser();
      setuser(res);
    }
    verify();
  }, []);

  return (
    <div className="bg-background">
      <div className="flex flex-row z-20 bg-[#ffffff30] backdrop-blur-sm justify-between px-4 py-2 border-b fixed w-screen">
        <img src="/imgs/logo_black.png" alt="Vida Nova" className="w-[180px] z-20" style={{ marginLeft: -18, }} />
        <Drawer>
          <DrawerTrigger>
            <div className="w-[48px] h-[48px] border rounded-full flex-col flex items-center justify-center">
              <AlignJustify size={24} />
            </div>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>O que deseja fazer?</DrawerTitle>
              <DrawerDescription>Clique em um dos botões abaixo ou arraste esse componente para baixo.</DrawerDescription>
            </DrawerHeader>

            <div className="w-full flex-col flex gap-4 px-6">
              {user?.isAdmin &&
                <Link href="/dashboard" >
                  <Button className="w-full">
                    Painel de Controle
                  </Button>
                </Link>}


              {user && <MenuProfile user={user} />}

              {!user &&
                <>
                  <Link href="/auth/login">
                    <Button className="w-full">
                      Fazer Login
                    </Button>
                  </Link>
                  <Link href="/" >
                    <Button className="w-full" variant='outline' >
                      Solicitar acesso
                    </Button>
                  </Link>
                </>
              }
            </div>
            <DrawerFooter className="px-6 border-t pt-4 mt-4">
              <DrawerClose>
                <Button variant="secondary" className="w-full">Fechar</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="pt-[90px] container mx-auto px-4 z-0">
        <BookingList />
      </div>
    </div>
  )
}

const MenuProfile = ({ user }: { user: any }) => {
  const router = useRouter()
  const handleLogout = () => {
    try {
      deleteToken();
      router.replace('/auth/login');
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Drawer>
      <div className="flex flex-row justify-between items-center">
        <DrawerTrigger>
          <div className="flex flex-row ">
            <div className="uppercase w-[52px] h-[52px] bg-secondary rounded-full items-center justify-center flex flex-col">
              {user?.name?.slice(0, 2)}
            </div>
            <div className="flex flex-col pl-3 justify-center items-start">
              <span className="font-semibold text-[18px] -mb-2">
                {user?.name}
              </span>
              <span className="font-regular text-[14px] opacity-70">
                {user?.email}
              </span>
            </div>
          </div>
        </DrawerTrigger>
        <div className="border w-[42px] h-[42px] rounded-full cursor-pointer flex flex-col justify-center items-center" onClick={handleLogout} >
          <LogOut size={18} color='#00000090' />
        </div>
      </div>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Editar perfil</DrawerTitle>
          <DrawerDescription>Altere seu nome, celular e email.</DrawerDescription>
        </DrawerHeader>
        <Profile />
        <DrawerFooter className="px-6 border-t pt-4 mt-4">
          <DrawerClose>
            <Button variant="secondary" className="w-full">Fechar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>

    </Drawer>

  )
}