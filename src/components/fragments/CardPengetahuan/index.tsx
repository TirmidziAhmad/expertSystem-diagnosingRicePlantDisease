import Image from "next/image";
import { DialogRoot, DialogTrigger, DialogContent, DialogHeader, DialogBody, DialogFooter, DialogCloseTrigger, DialogTitle } from "@/components/ui/dialog";

interface CardPengetahuanProps {
  title: string;
  description: string;
  image: string;
  symptoms: string[];
  solutions: string[];
}

const CardPengetahuan: React.FC<CardPengetahuanProps> = ({ title, description, image, symptoms, solutions }) => {
  return (
    <>
      <DialogRoot size={"lg"} placement={"center"}>
        <div className="rounded-lg border-2 p-4">
          <Image src={image} alt={title} className="rounded-lg mb-4" width={700} height={700} />
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-gray-600 mb-4 truncate">{description}</p>
          <DialogTrigger>
            <button className="bg-olive font-semibold text-white px-4 py-2 rounded hover:bg-yellow-600">Detail</button>
          </DialogTrigger>
        </div>
        <DialogContent className="bg-[#FFFDF9] text-[#352802]">
          <DialogHeader>
            <DialogTitle className="font-bold">{title}</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <div className="flex justify-center items-center">
              <Image src={image} alt={title} className="rounded-lg mb-4" width={400} height={400} />
            </div>
            <p className="indent-[5%]">{description}</p> <br />
            <h1 className="font-bold">Gejala:</h1>
            <ul className="list-disc pl-5">
              {symptoms.map((symptom, index) => (
                <li key={index}>{symptom}</li>
              ))}
            </ul>
            <br />
            <h1 className="font-bold">Solusi:</h1>
            <ul className="list-disc pl-5">
              {solutions.map((solution, index) => (
                <li key={index}>{solution}</li>
              ))}
            </ul>
          </DialogBody>
          <DialogFooter></DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default CardPengetahuan;
