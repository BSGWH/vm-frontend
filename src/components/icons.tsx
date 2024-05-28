import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import FolderIcon from '@mui/icons-material/Folder';
import TableRowsIcon from '@mui/icons-material/TableRows';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import SettingsIcon from '@mui/icons-material/Settings';
import PersonIcon from '@mui/icons-material/Person';
import AddressesIcon from '@mui/icons-material/LocationOn';
import { SvgIconComponent } from '@mui/icons-material';

  
  export type Icon = SvgIconComponent;
  
  export const Icons:Record <string, SvgIconComponent> = {
    dashboard: SpaceDashboardIcon,
    MyVehicles:DirectionsCarIcon,
    Documents: FolderIcon,
    Logs: TableRowsIcon,
    Insights:AutoGraphIcon,
    Settings:SettingsIcon,
    Profile:PersonIcon,
    Addresses: AddressesIcon
  };