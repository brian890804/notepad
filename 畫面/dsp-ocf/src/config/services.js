import webConfig from './base';

const { domain, contextRoot } = webConfig;

const v1 = '/api/v1';
const v2 = '/api/v2';

export default {
	getContextRoot: contextRoot,
	getLocale: `${contextRoot}locales`,
	domain: `${domain}`,

	/** region */
	regions: `${domain}${v2}/regions`,
	regionSiteCompanyTree: `${domain}${v2}/region/site/company`,

	/** dropdown */
	dropdown: `${domain}${v2}/dropdown/{cate}`, // post 新增
	dropdowns: `${domain}${v2}/dropdown/{cate}/all`, // get 取得

	/** resource */
	resource: `${domain}${v2}/resource`,
	resourceFactor: `${domain}${v2}/resource/ghg/factorTable`,

	scope: `${domain}${v2}/scope`,
	isoMainCategory: `${domain}${v2}/iso/mainCategory`,
	file: `${domain}${v2}/file`,

	/** Site */
	site: `${domain}${v2}/site`,
	siteAll: `${domain}${v2}/site/all`,
	siteEquipments: `${domain}${v2}/site/{siteId}/equipments`,
	siteEquipmentAll: `${domain}${v2}/site/{siteId}/equipment/all`,
	siteEquipment: `${domain}${v2}/equipment`,
	siteEquipmentEmission: `${domain}${v2}/equipment/{equipmentId}/emissionSources`,
	siteOperationProcesses: `${domain}${v2}/site/{siteId}/ops`,
	siteOperationProcess: `${domain}${v2}/op`,
	siteOperationProcessEmission: `${domain}${v2}/op/{opId}/emissionSources`,
	siteOperationProcessAll: `${domain}${v2}/site/{siteId}/op/all`,
	siteEmissions: `${domain}${v2}/site/{siteId}/emissionSources`,

	/** Significance Assessment */
	siteSignfiacanceAssessment: `${domain}${v1}/site/{siteId}/significanceAssessment`,
	siteSignfiacanceAssessmentScore: `${domain}${v1}/site/{siteId}/significanceAssessment/score`,
	siteSignfiacancEvaluationTable: `${domain}${v1}/site/{siteId}/evaluationTable`,
	siteSignfiacancEvaluationTableOptions: `${domain}${v1}/site/{siteId}/evaluationTable/options`,
	siteSignfiacancEvaluationTableColumns: `${domain}${v1}/site/{siteId}/evaluationTable/columns`,

	siteEmission: `${domain}${v2}/emissionSource`,
	siteEmissionActivities: `${domain}${v2}/emissionSource/{emissionSourceId}/activityDatas`,
	siteEmissionPredefined: `${domain}${v2}/emissionSource/predefined?scopeId={scopeId}`,
	siteEmissionActivity: `${domain}${v2}/activityData`,
	siteResource: `${domain}${v2}/site/resources`,
	siteResources: `${domain}${v2}/site/{siteId}/resources`,
	siteResourceAll: `${domain}${v2}/site/{siteId}/resource/all`,
	siteOverview: `${domain}${v2}/site/{siteId}/overview`,

	/** Project */
	project: `${domain}${v2}/project`,
	projects: `${domain}${v2}/projects`,
	exportProject: `${domain}${v2}/project/{projectId}/export`,

	/** GHG */
	ghgAll: `${domain}${v2}/ghg/all`,
	ghgGroupByType: `${domain}${v2}/ghg/all/groupByType`,

	/** factor table */
	ghgList: `${domain}${v2}/ghg/factorTypes`,
	ghgFactorType: `${domain}${v2}/ghg/factorType`,
	ghgFactorTables: `${domain}${v2}/ghg/{referenceId}/factorTables`,
	ghgFactorTable: `${domain}${v2}/ghg/factorTable`,
	gwpList: `${domain}${v2}/gwp/factors`,
	gwpFactor: `${domain}${v2}/gwp/factor`,

	/** statisticalAnalysis */
	// year
	yearEmissionOverview: `${domain}${v2}/annoual/overview`,
	yearEmissionList: `${domain}${v2}/annoual/scopes`,
	yearElectricity: `${domain}${v2}/annoual/electricity`,
	yearEnergy: `${domain}${v2}/annoual/energy`,
	yearWater: `${domain}${v2}/annoual/water`,
	yearGarbage: `${domain}${v2}/annoual/garbage`,

	siteReportEmission: `${domain}${v2}/siteReport/emission`,
	siteReportElectricity: `${domain}${v2}/siteReport/electricity`,
	siteReportEnergy: `${domain}${v2}/siteReport/energy`,
	siteReportWater: `${domain}${v2}/siteReport/water`,
	siteReportGarbage: `${domain}${v2}/siteReport/garbage`,

	/** Emission Source Tag */
	emissionTag: `${domain}${v1}/emissionSourceTag`,
	emissionTags: `${domain}${v1}/emissionSourceTag/all`,

	/** Unit */
	unitRates: `${domain}${v1}/unit/rates`,
};
