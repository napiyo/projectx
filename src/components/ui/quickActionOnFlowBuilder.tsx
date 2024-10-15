export function QuickActionOnFlowBuilder({onSave,onRestore}:{onSave:()=>void,onRestore:()=>void}){
    return <div className="bg-white w-fit py-2 px-3 rounded-sm fixed right-8  top-6 m-auto flex gap-2 z-[100]">
        <button onClick={onSave}>Save</button>
        <button onClick={onRestore}>Edit</button>
        <button>Publish</button>
        <button>Oraganize</button>
    </div>
}