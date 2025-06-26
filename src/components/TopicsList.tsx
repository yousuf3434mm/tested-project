import React from 'react'
import RemoveBtn from './RemoveBtn'
import Link from 'next/link'
import { HiPencilAlt } from "react-icons/hi";

interface TopicsListProps {
    id: string;
}

const TopicsList: React.FC<TopicsListProps> = ({ id }) => {
    return (
        <div className="flex justify-between items-center p-4 shadow-md max-w-3xl mx-auto">

            <div>
                <h2> Topic Title</h2>
                <h3>Topic Description</h3>
            </div>

            <div className="flex items-center gap-4">
                <RemoveBtn />
                <Link href={`/edittopic/${id}`} className='font-bold'><HiPencilAlt /></Link>
            </div>



        </div>
    )
}

export default TopicsList
