import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

const documents = [
  {
    document: "Inspection",
    vehicle: "Ford Explorer",
    date: "2024/3/1"
  },
  {
    document: "Insurance",
    vehicle: "Toyota Camry",
    date: "2024/3/1"
  }
]

export function HeroCardDocTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
					<TableHead className="w-[100px]"><Checkbox/></TableHead>
          <TableHead className="w-[100px]">DOCUMENT</TableHead>
          <TableHead>VEHICLE</TableHead>
          <TableHead>DATE</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {documents.map((document) => (
          <TableRow key={document.document}>
						<TableHead className="w-[100px]"><Checkbox/></TableHead>
            <TableCell className="font-medium">{document.document}</TableCell>
            <TableCell>{document.vehicle}</TableCell>
            <TableCell>{document.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
