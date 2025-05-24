import { Navbar } from "@/components/admin-panel/navbar";
import { UserNav } from "@/components/admin-panel/user-nav";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Dashboard()
{
    // await new Promise((resolve) => setTimeout(resolve, 10000));
     return (
    <div className="flex-1  flex justify-center  items-center p-4">
        <div className="flex-1 flex-row w-full justify-center items-center text-center">
        <p>Hello world</p>
        {/* <ModeToggle />
        <UserNav /> */}
        {/* <Navbar title={"Miyu"} /> */}
        </div>
        </div>
        )
   
}