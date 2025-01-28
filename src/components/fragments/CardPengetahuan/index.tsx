import Image from 'next/image';

interface CardPengetahuanProps {
  title: string;
  description: string;
  image: string;
}

const CardPengetahuan: React.FC<CardPengetahuanProps> = ({ title, description, image }) => {
  return (
    <div className=' rounded-lg border-2 p-4 size-fit '>
      <Image src={image} alt={title} className='rounded-lg mb-4' width={400} height={400} />

      <h3 className='text-lg font-semibold mb-2'>{title}</h3>
      <p className='text-gray-600 mb-4 truncate'>{description}</p>
      <button className='bg-olive font-semibold text-white px-4 py-2 rounded hover:bg-yellow-600  '>Detail</button>
    </div>
  );
};

export default CardPengetahuan;
