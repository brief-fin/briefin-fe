export default function TermsPage() {
  return (
    <div className="flex h-full w-full flex-col gap-10 pb-16">
      {/* Header */}
      <section
        className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen py-16pxr"
        style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #1E40AF 100%)' }}>
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="mb-4 text-sm font-semibold tracking-widest text-blue-200 uppercase">
            BrieFin
          </p>
          <h1 className="fonts-heading1 text-white">이용약관</h1>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto w-full max-w-3xl flex flex-col gap-8">
        {TERMS.map((term) => (
          <section key={term.title} className="flex flex-col gap-3">
            <h2
              className={`fonts-heading3 ${term.highlight ? 'text-red-500' : 'text-text-primary'}`}>
              {term.title}
            </h2>
            <div className="rounded-card border border-surface-border bg-surface-white p-6 shadow-card">
              {term.intro && (
                <p className="fonts-body1 text-text-secondary">{term.intro}</p>
              )}
              {term.items && (
                <ol className="flex flex-col gap-2 list-decimal list-inside">
                  {term.items.map((item) => (
                    <li key={item} className="fonts-body2 text-text-secondary">
                      {item}
                    </li>
                  ))}
                </ol>
              )}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

const TERMS = [
  {
    title: '제1조 목적',
    intro:
      '이 약관은 Briefin(이하 "서비스")이 제공하는 금융 정보 제공 서비스의 이용과 관련하여, 서비스와 이용자 간의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.',
  },
  {
    title: '제2조 서비스의 성격',
    items: [
      '본 서비스는 국내 상장 기업의 뉴스 및 공시 정보를 수집·가공하여 제공하는 플랫폼입니다.',
      '서비스에서 제공하는 정보는 AI 기반 요약 및 분석 결과를 포함하며, 참고용 정보입니다.',
      '본 서비스는 투자 자문, 투자 권유 또는 금융 상품 추천을 목적으로 하지 않습니다.',
    ],
  },
  {
    title: '🚨 제3조 투자 판단 및 책임',
    highlight: true,
    items: [
      '이용자는 서비스를 통해 제공되는 정보를 투자 판단의 참고 자료로만 활용해야 합니다.',
      '최종적인 투자 결정 및 그에 따른 책임은 전적으로 이용자 본인에게 있습니다.',
      '서비스는 투자 결과에 대해 어떠한 책임도 지지 않습니다.',
    ],
  },
  {
    title: '제4조 정보의 정확성',
    items: [
      '서비스는 신뢰할 수 있는 출처의 데이터를 기반으로 정보를 제공하기 위해 노력합니다.',
      '그러나 정보의 정확성, 완전성, 최신성을 보장하지 않습니다.',
      'AI 요약 과정에서 일부 정보가 생략되거나 왜곡될 수 있습니다.',
    ],
  },
  {
    title: '제5조 서비스 제공 및 변경',
    items: [
      '서비스는 운영상의 필요에 따라 일부 기능을 변경, 추가 또는 중단할 수 있습니다.',
      '서비스는 사전 공지 후 서비스 내용을 변경할 수 있습니다.',
    ],
  },
  {
    title: '제6조 이용자의 의무',
    items: [
      '이용자는 서비스를 부정한 방법으로 이용해서는 안 됩니다.',
      '서비스의 데이터를 무단으로 수집, 복제, 배포하는 행위를 금지합니다.',
    ],
  },
  {
    title: '제7조 지식재산권',
    items: [
      '서비스에서 제공되는 콘텐츠 및 데이터의 저작권은 서비스 또는 원저작자에게 있습니다.',
      '이용자는 이를 무단으로 복제, 배포할 수 없습니다.',
    ],
  },
  {
    title: '제8조 서비스 책임 범위',
    items: [
      '서비스는 천재지변, 시스템 장애 등 불가항력적인 사유로 인한 서비스 중단에 대해 책임지지 않습니다.',
      '서비스는 이용자의 기대 수익, 투자 성과 등에 대해 어떠한 보장도 하지 않습니다.',
    ],
  },
  {
    title: '제9조 약관의 변경',
    intro: '서비스는 필요 시 약관을 변경할 수 있으며, 변경된 약관은 공지 후 적용됩니다.',
  },
];
