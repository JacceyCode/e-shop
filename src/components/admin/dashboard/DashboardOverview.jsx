import { formatRevenue } from "../../../utils/formatPrice";

const DashboardOverview = ({ title, amount, icon, revenue = false }) => {
  const convertedAmount = revenue ? Number(amount).toFixed(2) : amount;
  const Icon = icon;

  return (
    <>
      <div className="xl:w-80 w-full space-y-4 text-center md:text-start px-5 py-8">
        <div className="flex md:justify-start justify-center items-center gap-2">
          <Icon className="text-slate-800 text-2xl" />
          <h3 className="uppercase text-2xl text-slate-700 font-semibold">
            {title}
          </h3>
        </div>

        <h1
          className={`font-bold text-3xl ${
            revenue ? "text-green-600" : "text-slate-800"
          }`}
        >
          {revenue ? "$" : null}
          {revenue ? formatRevenue(convertedAmount) : convertedAmount}
        </h1>
      </div>
    </>
  );
};

export default DashboardOverview;
