import Page from '@/components/helmet-page';
import MonthList from './MonthList';

export default function Months() {
  return (
    <Page title="Month List">
      <div className=" mt-3 mb-2">
        <MonthList />
      </div>
    </Page>
  );
}
