CREATE TABLE heirs_assets (
    id BIGSERIAL NOT NULL PRIMARY KEY, 
    asset_id BIGINT NOT NULL, 
    heir_id BIGINT NOT NULL, 
    CONSTRAINT fk_heirs_assets_asset
        FOREIGN KEY(asset_id) REFERENCES assets(id), 
    CONSTRAINT fk_heirs_assets_heir
        FOREIGN KEY(heir_id) REFERENCES heirs(id) 
);