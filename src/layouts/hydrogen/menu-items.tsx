import { SlNote } from 'react-icons/sl';
import { FiDatabase } from 'react-icons/fi';
import { PiStudentFill } from 'react-icons/pi';
import { SiGoogleclassroom } from 'react-icons/si';
import { MdOutlineDashboard } from 'react-icons/md';
import { FaChalkboardTeacher } from 'react-icons/fa';

export const menuItems = [
  // label start
  {
    name: 'Overview',
  },
  // label end
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    icon: <MdOutlineDashboard />,
  },

  {
    name: 'Menu',
  },
  {
    name: 'Master Data',
    href: '#',
    icon: <FiDatabase />,
    dropdownItems: [
      {
        name: 'Agama',
        href: '/admin/master/agama',
      },
      {
        name: 'Status',
        href: '/admin/master/status',
      },
      {
        name: 'Jabatan',
        href: '/admin/master/jabatan',
      },
      {
        name: 'Golongan',
        href: '/admin/master/golongan',
      },
      {
        name: 'Pendidikan',
        href: '/admin/master/pendidikan',
      },
      {
        name: 'Jurusan',
        href: '/admin/master/jurusan',
      },
      {
        name: 'Tipe Pelanggaran',
        href: '/admin/master/tipe-pelanggaran',
      },
    ],
  },

  {
    name: 'Guru',
    href: '/admin/guru',
    icon: <FaChalkboardTeacher />,
  },

  {
    name: 'Kelas',
    href: '/admin/kelas',
    icon: <SiGoogleclassroom />,
  },
  {
    name: 'Siswa',
    href: '/admin/siswa',
    icon: <PiStudentFill />,
  },
  {
    name: 'Pelanggaran',
    href: '/admin/pelanggaran',
    icon: <SlNote />,
  },
];
