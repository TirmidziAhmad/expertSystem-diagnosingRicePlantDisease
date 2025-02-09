import Image from "next/image";
import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogCloseTrigger, DialogTitle } from "@/components/ui/dialog";

interface CardPengetahuanProps {
  title: string;
  description: string;
  image: string;
  onClick: () => void;
}

const CardPengetahuan: React.FC<CardPengetahuanProps> = ({ title, description, image }) => {
  return (
    <>
      <DialogRoot>
        <div className="rounded-lg border-2 p-4">
          <Image src={image} alt={title} className="rounded-lg mb-4" width={300} height={300} />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 truncate">{description}</p>
          <DialogTrigger>
            <button className="bg-olive font-semibold text-white px-4 py-2 rounded hover:bg-yellow-600">Detail</button>
          </DialogTrigger>
        </div>
        <DialogContent className="bg-[#FFFDF9] text-[#352802]">
          <DialogHeader>
            <DialogTitle className="font-bold">Detail Riwayat Konsultasi</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p></p>
          </DialogBody>
          <DialogFooter></DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default CardPengetahuan;
