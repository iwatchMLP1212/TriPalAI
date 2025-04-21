import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  Dialog,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trash2, ClipboardList } from "lucide-react";
import { useState } from "react";

const SettingDialog = () => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDeleteAllChats = () => {
    // Add your delete logic here
    console.log("Deleting all chats...");
    setIsDeleteConfirmOpen(false);
  };

  return (
    <DialogContent className="max-w-md">
      <DialogHeader>
        <DialogTitle className="text-2xl font-semibold border-b pb-3 border-gray-200 dark:border-gray-700">
          Cài đặt
        </DialogTitle>
        <DialogDescription className="flex flex-col gap-5 mt-4">
          <Button
            variant="outline"
            className="h-12 text-base gap-3 hover:bg-gray-50 dark:hover:bg-gray-800"
          >
            <ClipboardList className="h-5 w-5 text-primary" />
            Tạo flashcard từ cuộc trò chuyện
          </Button>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <Dialog
              open={isDeleteConfirmOpen}
              onOpenChange={setIsDeleteConfirmOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="destructive"
                  className="w-full h-12 text-base gap-2 hover:bg-destructive/90 transition-colors"
                >
                  <Trash2 className="h-5 w-5" />
                  <span>Xóa toàn bộ cuộc trò chuyện</span>
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl font-semibold">
                    Xác nhận xóa
                  </DialogTitle>
                  <DialogDescription className="mt-2">
                    Bạn có chắc chắn muốn xóa toàn bộ lịch sử trò chuyện?
                    <span className="block mt-1 text-destructive">
                      Hành động này không thể hoàn tác!
                    </span>
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                  <Button
                    variant="outline"
                    onClick={() => setIsDeleteConfirmOpen(false)}
                  >
                    Hủy bỏ
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteAllChats}>
                    Xác nhận xóa
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2 px-1">
              Thao tác này sẽ xóa vĩnh viễn tất cả lịch sử trò chuyện.
            </p>
          </div>
        </DialogDescription>
      </DialogHeader>
    </DialogContent>
  );
};

export default SettingDialog;
