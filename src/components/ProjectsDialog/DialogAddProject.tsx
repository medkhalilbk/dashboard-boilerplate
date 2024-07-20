"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import Image from "next/image"; 
import { useDispatch, useSelector } from "react-redux";
import { addProject } from "@/lib/features/projectSlice";
import { addProjectAction, getStacksAction } from "@/lib/actions/projects";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { Istack, setStacks } from "@/lib/features/stackSlice";
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Toggle } from "../ui/toggle";
import { IStack } from "@/types/Stack";
import { getGithubRepos } from "@/lib/actions/githubApi";
import { IRepository } from "@/types/Repository";

export default function DialogAddProject() {
  const [projectUrl, setProjectUrl] = React.useState(
    "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
  );
  const [projectName, setProjectName] = React.useState("");
  const [imgUrl, setImgUrl] = React.useState(""); 
  const [stacks, setStacks] = React.useState<IStack[]>([]); 
  const [selectedRepo,setSelectedRepo] = React.useState<string>("")
  const stacksFromRedux = useSelector((state:any) => (state.stacks.data)) 
  const [repos,setRepos] = React.useState<any[]>([]);
  const dispatch = useDispatch();

  async function addProjectRequest(project: { name: string; iconUrl: string }) {
    try {
      const res = await addProjectAction(project);
      dispatch(addProject(res.data.project));
      toast.success(res.data.message);
    } catch (error) {
      toast.error("An error occurred");
    }
  }

  React.useEffect(() => {
      if(!stacksFromRedux.length){
        getStacksAction().then((res:AxiosResponse) => {
          setStacks(res.data.stacks)
          console.log(res.data.stacks)
        })
      }
  }, []);
React.useEffect(() => {
  getGithubRepos().then((res) => {
    setRepos(res)
  }).catch((err) => {
    console.error(err)
  })
} , [stacks])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-auto">
        <DialogHeader>
          <DialogTitle>Project information</DialogTitle>
          <DialogDescription>
            Make sure that your information is up to date.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Project Name
            </Label>
            <Input
              id="name"
              value={projectName}
              className="col-span-3"
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="url" className="text-right">
              Image URL
            </Label>
            <Input
            id="name"
            value={imgUrl}
            className="col-span-3"
            onChange={(e) => {
              setImgUrl(e.target.value);
            }}
            />
          </div>
         <Label className="mx-auto" >
          Stacks 👇
         </Label> 
         <div className=" grid grid-cols-4 gap-4">
         {stacks.map((stack: IStack) => (
                <Toggle key={stack.id}>{stack.name}</Toggle>
            ))}
         </div>
          
            <Label htmlFor="url" className="text-center">
              Github Url 👇
            </Label>
            <Select onValueChange={(value:string) => {
            setSelectedRepo(value)
            }}>
      <SelectTrigger className="w-auto">
        <SelectValue placeholder="Select a Repository" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Github Repositories </SelectLabel>
          {repos.map((repo:IRepository) => {
            return <>  
          <SelectItem value={repo.url}>{repo.name}</SelectItem> 
          </>
          })}
        </SelectGroup>
      </SelectContent>
    </Select> 
    <Textarea placeholder="Description for the project" />
    {imgUrl.length > 0 ? <Image className="mx-auto" src={imgUrl} height={250} width={250} alt="image" /> : ""}
        </div>
        <DialogFooter>
          <DialogClose>
            <Button
              type="submit"
              disabled={true}
              onClick={() => {
                addProjectRequest({ name: projectName, iconUrl: projectUrl });
              }}
            >
              Add project
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
