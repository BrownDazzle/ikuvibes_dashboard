import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { IGenre } from "@/lib/database/models/genre.model"
import { startTransition, useEffect, useState } from "react"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { createGenre, getAllGenres } from "@/lib/actions/genre.action"

type DropdownProps = {
    value?: string
    onChangeHandler?: () => void
}

const GenreDropdown = ({ value, onChangeHandler }: DropdownProps) => {
    const [categories, setCategories] = useState<IGenre[]>([])
    const [newCategory, setNewCategory] = useState('');

    const handleAddCategory = () => {
        createGenre({
            genreName: newCategory.trim(),
            type: 'Genre'
        })
            .then((category) => {
                setCategories((prevState) => [...prevState, category])
            })
    }

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllGenres();
            categoryList && setCategories(categoryList as IGenre[])
        }

        getCategories();
    }, [])

    return (
        <Select onValueChange={onChangeHandler} defaultValue={value}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
                {categories.length > 0 && categories.map((category) => (
                    <SelectItem key={category._id} value={category._id} className="select-item p-regular-14">
                        {category.name}
                    </SelectItem>
                ))}

                <AlertDialog>
                    <AlertDialogTrigger className="p-medium-14 flex w-full rounded-sm py-3 pl-8 text-primary-500 hover:bg-primary-50 focus:text-primary-500">Add new genre</AlertDialogTrigger>
                    <AlertDialogContent className="bg-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle>New Genre</AlertDialogTitle>
                            <AlertDialogDescription>
                                <Input type="text" placeholder="Genre name" className="input-field mt-3" onChange={(e) => setNewCategory(e.target.value)} />
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => startTransition(handleAddCategory)}>Add</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </SelectContent>
        </Select>
    )
}

export default GenreDropdown