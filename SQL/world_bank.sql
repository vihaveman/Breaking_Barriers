CREATE TABLE "Predicted_Poverty" (
    "country_name" VARCHAR(400),
    "year" NUMERIC NOT NULL,
    "predicted_poverty" NUMERIC,
    CONSTRAINT "pk_Predicted_Poverty" PRIMARY KEY ("country_name")
);



CREATE TABLE "world_bank" (
    "country_name" VARCHAR(400),
    "country_code" VARCHAR(20),
    "year" NUMERIC,
    "atm_usage" NUMERIC,
    "gdp" NUMERIC,
    "high_tech_export" NUMERIC,
    "high_tech_import" NUMERIC,
    "internet_subscription" NUMERIC,
    "internet_usage" NUMERIC,
    "ip_income" NUMERIC,
    "labour_force" NUMERIC,
    "med_high_tech_manu" NUMERIC,
    "mobile_sub" NUMERIC,
    "personal_remitt" NUMERIC,
    "poverty" NUMERIC,
    "stock_traded" NUMERIC,
    "tech_grant" NUMERIC,
    "unemployment" NUMERIC,
    "med_high_tech_exp" NUMERIC,
    CONSTRAINT "pk_world_bank" PRIMARY KEY ("country_code"),
    CONSTRAINT "fk_world_bank_predicted_poverty" FOREIGN KEY ("country_name")
        REFERENCES "Predicted_Poverty" ("country_name")
);

