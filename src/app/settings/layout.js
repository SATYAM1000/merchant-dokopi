import SettingsSidebar from "@/components/merchant/settings/SettingsSidebar";

export default async function SettingsLayout({ children }) {
  return (
    <div className="w-full h-full flex p-6 bg-[#f5f5f5]">
      <SettingsSidebar />

      <div className="w-full h-fit bg-white ml-6 p-6">{children}</div>
    </div>
  );
}
