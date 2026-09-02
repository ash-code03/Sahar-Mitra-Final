import { useTranslation } from '../../i18n/translations';

export function Greeting() {
  const { t } = useTranslation();

  return (
    <div className="mt-2 mb-4">
      <div className="font-tamil text-2xl font-extrabold text-white">
        {t('welcome')}
      </div>
      <div className="font-tamil text-[15.5px] text-ice mt-1 font-semibold">
        {t('how_is_sea')}
      </div>
      <div className="font-tamil text-[12.5px] text-slateLight mt-1.5 leading-[1.5]">
        {t('info_desc')}
      </div>
    </div>
  );
}
