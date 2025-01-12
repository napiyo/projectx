export default async function Dashboard()
{
    await new Promise((resolve) => setTimeout(resolve, 10000));
     return (<>
    <div className="h-screen w-full bg-black text-white">
        Dashboard
        </div>
        </>)
   
}