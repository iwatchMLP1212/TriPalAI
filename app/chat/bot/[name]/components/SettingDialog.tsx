import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

const SettingDialog = () => {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-2xl border-b pb-1 border-secondary">
          Cài đặt
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-4">
          <Button>Test tính cách</Button>
          <Button variant={"destructive"}>
            <Trash2 size={24} />
            Delete chat
          </Button>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default SettingDialog;
