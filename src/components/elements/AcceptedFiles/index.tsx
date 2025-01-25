import { Button } from "@/components/ui/button";
import {
  FileUploadList,
  FileUploadRoot,
  FileUploadTrigger,
} from "@/components/ui/file-upload";
import { HiUpload } from "react-icons/hi";

const AcceptedFiles = () => {
  return (
    <FileUploadRoot accept={["image/png"]}>
  <div className="flex items-center gap-4 mt-4">
    <FileUploadTrigger
      asChild
      className="bg-sand p-2 rounded-md text-white"
    >
      <Button 
        variant="outline" 
        size="sm" 
        className="flex items-center gap-2"
      >
        <HiUpload className="w-4 h-4" />
        <span>Upload file</span>
      </Button>
    </FileUploadTrigger>
    <div className="flex flex-col">
        <FileUploadList />
    </div>
  </div>
</FileUploadRoot>

  );
};

export default AcceptedFiles;
